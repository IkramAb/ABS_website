#import <Foundation/Foundation.h>
#import <AppKit/AppKit.h>

// Offset crop. usage: crop <in> <out> <x> <y> <w> <h>   (y measured from top)
int main(int argc, const char *argv[]) {
  @autoreleasepool {
    if (argc != 7) { fprintf(stderr, "usage: crop <in> <out> <x> <y> <w> <h>\n"); return 1; }
    int rx = atoi(argv[3]), ry = atoi(argv[4]), rw = atoi(argv[5]), rh = atoi(argv[6]);

    NSBitmapImageRep *src = [NSBitmapImageRep imageRepWithData:
      [NSData dataWithContentsOfFile:@(argv[1])]];
    if (!src) { fprintf(stderr, "could not read %s\n", argv[1]); return 1; }
    size_t W = [src pixelsWide], H = [src pixelsHigh];
    if (rx + rw > (int)W) rw = (int)W - rx;
    if (ry + rh > (int)H) rh = (int)H - ry;

    CGColorSpaceRef cs = CGColorSpaceCreateWithName(kCGColorSpaceSRGB);
    CGContextRef ctx = CGBitmapContextCreate(NULL, rw, rh, 8, 0, cs,
                                             kCGImageAlphaPremultipliedLast);
    CGContextDrawImage(ctx, CGRectMake(-rx, -((int)H - ry - rh), W, H), [src CGImage]);
    CGImageRef out = CGBitmapContextCreateImage(ctx);

    NSBitmapImageRep *rep = [[NSBitmapImageRep alloc] initWithCGImage:out];
    [[rep representationUsingType:NSBitmapImageFileTypePNG properties:@{}]
      writeToFile:@(argv[2]) atomically:YES];
    printf("wrote %s %dx%d\n", argv[2], rw, rh);
    CGImageRelease(out); CGContextRelease(ctx); CGColorSpaceRelease(cs);
  }
  return 0;
}
