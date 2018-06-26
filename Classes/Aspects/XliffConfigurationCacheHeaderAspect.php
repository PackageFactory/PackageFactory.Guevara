<?php

namespace Neos\Neos\Ui\Aspects;

/*                                                                        *
 * This script belongs to the Neos Flow package "Neos.Neos.Ui".          *
 *                                                                        *
 *                                                                        */

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Aop\JoinPointInterface;
use Neos\Flow\Session\SessionInterface;
use Neos\Neos\Controller\Backend\SchemaController;

/**
 * adds a Cache-Control: max-age=3600 header to the /xliff.json endpoint; speeds up loading the new UI.
 *
 * NOTE: we currently do this in an aspect, to also increase performance on older Neos versions (some people still
 * need time to upgrade to the latest Neos version...)
 *
 * @Flow\Scope("singleton")
 * @Flow\Aspect
 */
class XliffConfigurationCacheHeaderAspect
{

    /**
     * @Flow\Inject
     * @var SessionInterface
     */
    protected $session;

    /**
     * @Flow\Before("method(Neos\Neos\Controller\Backend\BackendController->xliffAsJsonAction())")
     * @param JoinPointInterface $joinPoint
     * @return mixed
     */
    public function setControllerContextFromContentElementWrappingImplementation(JoinPointInterface $joinPoint)
    {
        if ($this->session->isStarted() && !$this->session->getData('__neosLegacyUiEnabled__')) {
            /** @var SchemaController $proxy */
            $proxy = $joinPoint->getProxy();

            // Cache for one week; as cache busting is enabled.
            $proxy->getControllerContext()->getResponse()->setHeader('Cache-Control', 'max-age=' . (3600 * 24 * 7));
        }
    }
}
