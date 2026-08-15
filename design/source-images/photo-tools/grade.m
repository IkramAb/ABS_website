#import <Foundation/Foundation.h>
#import <AppKit/AppKit.h>
#import <CoreImage/CoreImage.h>

// Colour grade toward the hero palette. Alpha is preserved, so this works on
// cutouts as well as full frames.
// usage: grade <in> <out.png> <saturation> <brightness> <targetKelvin>
int main(int argc, const char *argv[]) {
  @autoreleasepool {
    if (argc != 6) {
      fprintf(stderr, "usage: grade <in> <out.png> <sat> <brightness> <targetK>\n");
      return 1;
    }
    double sat = atof(argv[3]), bri = atof(argv[4]), targetK = atof(argv[5]);

    CIImage *img = [CIImage imageWithContentsOfURL:
      [NSURL fileURLWithPath:@(argv[1])]];
    if (!img) { fprintf(stderr, "could not read %s\n", argv[1]); return 1; }
    CGRect extent = img.extent;

    // Warmth first. Lowering the target below 6500 warms the image — the
    // opposite of the intuitive direction, confirmed when matching hero-2.
    CIFilter *temp = [CIFilter filterWithName:@"CITemperatureAndTint"];
    [temp setValue:img forKey:kCIInputImageKey];
    [temp setValue:[CIVector vectorWithX:6500 Y:0] forKey:@"inputNeutral"];
    [temp setValue:[CIVector vectorWithX:targetK Y:0] forKey:@"inputTargetNeutral"];
    CIImage *out = temp.outputImage;

    CIFilter *cc = [CIFilter filterWithName:@"CIColorControls"];
    [cc setValue:out forKey:kCIInputImageKey];
    [cc setValue:@(sat) forKey:kCIInputSaturationKey];
    [cc setValue:@(bri) forKey:kCIInputBrightnessKey];
    [cc setValue:@(1.0) forKey:kCIInputContrastKey];
    out = cc.outputImage;

    // Colour filters bleed past the source bounds; clamp back so cutout
    // margins stay transparent rather than picking up a haze.
    out = [out imageByCroppingToRect:extent];

    CGColorSpaceRef cs = CGColorSpaceCreateWithName(kCGColorSpaceSRGB);
    CIContext *ctx = [CIContext contextWithOptions:@{}];
    NSData *png = [ctx PNGRepresentationOfImage:out
                                         format:kCIFormatRGBA8
                                     colorSpace:cs
                                        options:@{}];
    if (!png) { fprintf(stderr, "encode failed\n"); return 1; }
    [png writeToFile:@(argv[2]) atomically:YES];
    CGColorSpaceRelease(cs);
  }
  return 0;
}
