# Project: Deep Learning Image Colorizer

**Objective:**
Developed an end-to-end deep learning system to automate the colorization of grayscale images, transforming single-channel luminance data into realistic, multi-channel chrominance outputs.

**Deep Learning Architecture:**
*   **Framework:** Built using GAN (Generative Adversarial Network) architecture, specifically the Pix2Pix framework for image-to-image translation.
*   **Generator (U-Net):** Implemented a symmetric encoder-decoder structure with skip connections to preserve high-resolution spatial details and prevent information loss during downsampling.
*   **Discriminator:** Developed a convolutional network to distinguish between authentic and generated color distributions, refining the generator's output via adversarial training.
*   **Color Space Logic:** Utilized the CIE Lab color space instead of RGB, where the model takes the L (Luminance) channel as input and predicts the A and B (chrominance) channels, ensuring more stable training and natural results.

**Technical Implementation & Skills:**
*   **Optimization:** Employed a combined loss strategy—leveraging Adversarial Loss for visual realism and Mean Absolute Error (L1) for pixel-level accuracy.
*   **Advanced Normalization:** Integrated Batch Normalization and LeakyReLU activations across downsampling blocks to stabilize gradient flow and improve convergence.
*   **Custom Weight Initialization:** Applied Random Normal Initializers (mean=0.0, std=0.02) to ensure stable GAN training.
*   **Data Pipeline:** Engineered automated preprocessing scripts for image normalization, resizing (256x256), and color space conversion using `scikit-image` and `Pillow`.
*   **Deployment:** Developed an interactive Streamlit application integrated with Google Cloud Storage for scalable model serving and data management.

**Outcome:**
Successfully demonstrated the ability to design, train, and deploy complex deep learning models that solve high-dimensional image processing tasks with production-grade performance.
