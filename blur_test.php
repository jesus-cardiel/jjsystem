<?php
function blurImage($filename) {
    $img = @imagecreatefrompng($filename);
    if (!$img) return false;
    
    // Apply blur multiple times for stronger effect
    for ($i = 0; $i < 20; $i++) {
        imagefilter($img, IMG_FILTER_GAUSSIAN_BLUR);
    }
    
    imagepng($img, $filename);
    imagedestroy($img);
    return true;
}

$file = 'c:/laragon/www/jjsystem/img/portfolio/quiniela/quiniela 1.png';
if (blurImage($file)) {
    echo "Blurred $file successfully.";
} else {
    echo "Failed to blur $file.";
}
?>
