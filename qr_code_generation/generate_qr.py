import qrcode
from PIL import Image
import os

def generate_qr_code(data, file_name):
    # Generate the QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    # Create an image
    img = qr.make_image(fill_color="black", back_color="white")

    # Save the image as JPEG
    jpeg_path = os.path.join(os.getcwd(), f"{file_name}.jpeg")
    img.save(jpeg_path, format="JPEG")
    print(f"QR Code saved as JPEG at: {jpeg_path}")

    # Save the image as WEBP
    webp_path = os.path.join(os.getcwd(), f"{file_name}.webp")
    img.save(webp_path, format="WEBP")
    print(f"QR Code saved as WEBP at: {webp_path}")

if __name__ == "__main__":
    # Desired URL is currently set to lml.live with baropen filter for this week. 
    #template http://localhost:3000/ubid
    qr_data = "https://app-a2efljur7q-uc.a.run.app/68524262-c33c-450c-856f-3a7f436fa441"
    output_file_name = "Testing"

    generate_qr_code(qr_data, output_file_name)