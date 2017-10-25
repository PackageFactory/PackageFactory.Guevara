<?php
namespace Neos\Neos\Ui\Fusion;

use Neos\Neos\Ui\Domain\Service\ConfigurationRenderingService;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Exception;
use Neos\Fusion\FusionObjects\AbstractFusionObject;

class RenderConfigurationImplementation extends AbstractFusionObject
{

    /**
     * @Flow\Inject
     * @var ConfigurationRenderingService
     */
    protected $configurationRenderingService;

    /**
     * @Flow\InjectConfiguration()
     * @var array
     */
    protected $settings;

    protected function getContext()
    {
        return $this->fusionValue('context');
    }

    protected function getPath()
    {
        return $this->fusionValue('path');
    }


    /**
     * Appends an item to the given collection
     *
     * @return array
     * @throws Exception
     */
    public function evaluate()
    {
        $context = $this->getContext();
        $pathToRender = $this->getPath();
        $context['controllerContext'] = $this->getruntime()->getControllerContext();

        if (!isset($this->settings[$pathToRender])) {
            throw new Exception('The path "Neos.Neos.Ui.' . $pathToRender . '" was not found in the settings.', 1458814468);
        }

        return $this->configurationRenderingService->computeConfiguration($this->settings[$pathToRender], $context);
    }
}
