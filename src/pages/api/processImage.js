import sharp from "sharp";
import { Buffer } from "node:buffer";

export const POST = async ({ request }) => {
  const data = await request.formData();
  const image = data.get("image");

  const imageArrayBuffer = await image.arrayBuffer();
  const uploadedImageBuffer = Buffer.from(imageArrayBuffer);
  let optimizedImageBuffer;

  try {
    const metadata = await sharp(uploadedImageBuffer).metadata();

    // Use Sharp to optimize the image
    optimizedImageBuffer = await sharp(uploadedImageBuffer)
      .resize({
        width: 600,
        fit: "contain",
        withoutEnlargement: true
      })
      .rotate()
      .toFormat(metadata.format, { quality: 75 })
      .toBuffer();
  } catch (error) {
    console.error("Error processing image with Sharp:", error);
    return new Response(
      JSON.stringify({
        message: "We could not process your image. Please try again later."
      }),
      { status: 500 }
    );
  }
  console.log("Successfully processed image with Sharp:", optimizedImageBuffer);
  return new Response(
    JSON.stringify({
      message: "Thanks for submitting your image!"
    }),
    { status: 200 }
  );
};
