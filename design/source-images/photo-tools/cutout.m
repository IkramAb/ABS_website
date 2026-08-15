#import <Foundation/Foundation.h>
#import <AppKit/AppKit.h>
#import <Vision/Vision.h>
#import <CoreImage/CoreImage.h>

// Subject lifting via Vision (macOS 14+): isolates the foreground subject and
// writes a PNG with alpha. usage: cutout <in> <out.png>
int main(int argc, const char *argv[]) {
  @autoreleasepool {
    if (argc != 3) { fprintf(stderr, "usage: cutout <in> <out.png>\n"); return 1; }

    NSURL *url = [NSURL fileURLWithPath:@(argv[1])];
    CIImage *input = [CIImage imageWithContentsOfURL:url];
    if (!input) { fprintf(stderr, "could not read %s\n", argv[1]); return 1; }

    VNGenerateForegroundInstanceMaskRequest *req =
        [[VNGenerateForegroundInstanceMaskRequest alloc] init];
    VNImageRequestHandler *handler =
        [[VNImageRequestHandler alloc] initWithURL:url options:@{}];

    NSError *err = nil;
    if (![handler performRequests:@[req] error:&err]) {
      fprintf(stderr, "vision failed: %s\n", err.localizedDescription.UTF8String);
      return 2;
    }

    VNInstanceMaskObservation *obs = req.results.firstObject;
    if (!obs) { fprintf(stderr, "no subject found\n"); return 3; }

    fprintf(stderr, "instances detected: %lu\n",
            (unsigned long)obs.allInstances.count);

    // Crop to the subject's own extent: with object-contain downstream, a
    // cutout that keeps its transparent margin renders smaller than its box
    // and stops overhanging the blob, which is the whole effect.
    CVPixelBufferRef masked =
        [obs generateMaskedImageOfInstances:obs.allInstances
                               fromRequestHandler:handler
                              croppedToInstancesExtent:YES
                                            error:&err];
    if (!masked) {
      fprintf(stderr, "mask generation failed: %s\n",
              err.localizedDescription.UTF8String);
      return 4;
    }

    CIImage *out = [CIImage imageWithCVPixelBuffer:masked];
    CGColorSpaceRef cs = CGColorSpaceCreateWithName(kCGColorSpaceSRGB);
    CIContext *ctx = [CIContext contextWithOptions:@{}];
    NSData *png = [ctx PNGRepresentationOfImage:out
                                         format:kCIFormatRGBA8
                                     colorSpace:cs
                                        options:@{}];
    if (!png) { fprintf(stderr, "png encode failed\n"); return 5; }
    [png writeToFile:@(argv[2]) atomically:YES];
    printf("wrote %s  (%.0f x %.0f)\n", argv[2],
           out.extent.size.width, out.extent.size.height);
    CVPixelBufferRelease(masked);
    CGColorSpaceRelease(cs);
  }
  return 0;
}
