<?php

namespace Intervention\Image\Gd\Commands;

class WidenCommand extends ResizeCommand
{
    /**
     * Resize image proportionally to given width
     *
     * @param  \Intervention\Image\Image $image
     *
     * @return bool
     */
    public function execute($image)
    {
        $width = $this->argument(0)->type('digit')->required()->value();
        $additionalConstraints = $this->argument(1)->type('closure')->value();

        $this->arguments[0] = $width;
        $this->arguments[1] = null;
        $this->arguments[2] = static function ($constraint) use ($additionalConstraints): void {
            $constraint->aspectRatio();
            if(is_callable($additionalConstraints)) {
                $additionalConstraints($constraint);
            }
        };

        return parent::execute($image);
    }
}
