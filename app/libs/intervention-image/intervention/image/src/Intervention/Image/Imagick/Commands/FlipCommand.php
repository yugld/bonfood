<?php

namespace Intervention\Image\Imagick\Commands;

use Intervention\Image\Commands\AbstractCommand;

class FlipCommand extends AbstractCommand
{
    /**
     * Mirrors an image
     *
     * @param  \Intervention\Image\Image $image
     *
     * @return bool
     */
    public function execute($image)
    {
        $mode = $this->argument(0)->value('h');

        if (in_array(strtolower($mode), [2, 'v', 'vert', 'vertical'])) {
            // flip vertical
            return $image->getCore()->flipImage();
        }
            // flip horizontal
            return $image->getCore()->flopImage();

    }
}
