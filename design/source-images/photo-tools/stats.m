#import <Foundation/Foundation.h>
#import <AppKit/AppKit.h>

// Mean saturation / value / R-B over the opaque pixels of an image.
// Alpha-aware so cutouts report the subject, not the empty margin.
// usage: stats <img>
int main(int argc, const char *argv[]) {
  @autoreleasepool {
    if (argc != 2) { fprintf(stderr, "usage: stats <img>\n"); return 1; }
    NSBitmapImageRep *src = [NSBitmapImageRep imageRepWithData:
      [NSData dataWithContentsOfFile:@(argv[1])]];
    if (!src) { fprintf(stderr, "could not read %s\n", argv[1]); return 1; }
    size_t W = [src pixelsWide], H = [src pixelsHigh];

    uint8_t *buf = calloc(W * H * 4, 1);
    CGColorSpaceRef cs = CGColorSpaceCreateWithName(kCGColorSpaceSRGB);
    CGContextRef ctx = CGBitmapContextCreate(buf, W, H, 8, W * 4, cs,
                                             kCGImageAlphaPremultipliedLast);
    CGContextDrawImage(ctx, CGRectMake(0, 0, W, H), [src CGImage]);

    double sSum = 0, vSum = 0, rbSum = 0; long n = 0;
    for (size_t i = 0; i < W * H; i++) {
      uint8_t *p = buf + i * 4;
      if (p[3] < 200) continue;             // skip transparent margin
      double r = p[0], g = p[1], b = p[2];
      double mx = fmax(r, fmax(g, b)), mn = fmin(r, fmin(g, b));
      sSum += mx > 0 ? (mx - mn) / mx : 0;  // HSV saturation
      vSum += mx / 255.0;
      rbSum += (r - b);
      n++;
    }
    if (!n) { fprintf(stderr, "no opaque pixels\n"); return 1; }
    printf("  %-34s sat %.3f   value %.3f   R-B %+7.2f   (%ld px)\n",
           [[@(argv[1]) lastPathComponent] UTF8String],
           sSum / n, vSum / n, rbSum / n, n);
    free(buf); CGContextRelease(ctx); CGColorSpaceRelease(cs);
  }
  return 0;
}
