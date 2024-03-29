<?php

namespace Intervention\Image\Imagick\Commands;

use Intervention\Image\Commands\AbstractCommand;
use Intervention\Image\Size;

class GetSizeCommand extends AbstractCommand
{
    /**
     * Reads size of given image instance in pixels
     *
     * @param  \Intervention\Image\Image $image
     *
     * @return bool
     */
    public function execute($image)
    {
        /** @var \Imagick $core */
        $core = $image->getCore();

        $this->setOutput(new Size(
            $core->getImageWidth(),
            $core->getImageHeight()
        ));

        return true;
    }
}
