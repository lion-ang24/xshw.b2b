## ADDED Requirements

### Requirement: Spec Multi-Image Display
The system SHALL retrieve all image URLs for the selected product specification from the data layer, sorted by whether they are primary (primary first). The frontend page SHALL show the first image by default.

#### Scenario: Display images on load
- **WHEN** the user views the product detail page for a product with a specification containing multiple images
- **THEN** the page SHALL display the primary (first) image of the selected specification
- **THEN** the image container SHALL show navigation arrows on the left and right if the selected specification has more than 1 image

### Requirement: Image Carousel Navigation
If the selected specification has multiple images, the system SHALL allow the user to cycle through the images using left and right arrows, or by clicking dots underneath the image. The carousel SHALL wrap around (clicking next on the last image returns to the first).

#### Scenario: Navigate to next image via arrow
- **WHEN** the user clicks the right navigation arrow on the product image container
- **THEN** the system SHALL display the next image in the sequence
- **THEN** the active indicator dot SHALL update to match the current image index

#### Scenario: Navigate to previous image via arrow
- **WHEN** the user clicks the left navigation arrow on the product image container
- **THEN** the system SHALL display the previous image in the sequence (wrapping to the last image if on the first)

#### Scenario: Select image via indicator dots
- **WHEN** the user clicks a specific indicator dot below the product image
- **THEN** the system SHALL display the image corresponding to that dot's index

### Requirement: Specification Switch Resets Index
When the user switches the selected product specification, the image viewer SHALL reset the active image index to 0 (displaying the first/primary image of the newly selected specification).

#### Scenario: Switch spec resets image index
- **WHEN** the user selects a different specification button
- **THEN** the system SHALL reset the displayed image index to 0 and show the first image of the newly selected specification

### Requirement: Lightbox Synchronized Navigation
The zoom Lightbox overlay SHALL display the currently active image. If the specification has multiple images, the Lightbox SHALL also provide left and right navigation arrows to cycle through images, and the active image index in the Lightbox SHALL remain synchronized with the main page's active image index.

#### Scenario: Open Lightbox and navigate
- **WHEN** the user clicks the zoom icon on the main image container
- **THEN** the Lightbox SHALL open displaying the current active image
- **WHEN** the user navigates using arrows inside the Lightbox and then closes the Lightbox
- **THEN** the main page image viewer SHALL display the same image selected in the Lightbox
