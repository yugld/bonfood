<?php

namespace Intervention\Image\Imagick\Commands;

use Intervention\Image\Commands\AbstractCommand;

class BackupCommand extends AbstractCommand
{
    /**
     * Saves a backups of current state of image core
     *
     * @param  \Intervention\Image\Image $image
     *
     * @return bool
     */
    public function execute($image)
    {
        $backupName = $this->argument(0)->value();

        // clone current image resource
        $clone = clone $image;
        $image->setBackup($clone->getCore(), $backupName);

        return true;
    }
}
