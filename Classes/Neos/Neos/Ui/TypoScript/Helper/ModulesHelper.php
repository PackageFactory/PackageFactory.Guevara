<?php
namespace Neos\Neos\Ui\TypoScript\Helper;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "Neos.Neos.Ui".          *
 *                                                                        *
 *                                                                        */

use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Security\Authorization\PrivilegeManagerInterface;
use TYPO3\Eel\ProtectedContextAwareInterface;

class ModulesHelper implements ProtectedContextAwareInterface
{
    /**
     * @var PrivilegeManagerInterface
     * @Flow\Inject
     */
    protected $privilegeManager;

    /**
     * @Flow\InjectConfiguration(path="TYPO3.Neos.modules")
     * @var array
     */
    protected $modules;

    /**
     * Checks whether a module is enabled
     *
     * @param strin $modulePath
     * @return boolean
     */
    public function isEnabled($modulePath)
    {
        $modulePathSegments = explode('/', $modulePath);
        $moduleConfiguration = Arrays::getValueByPath($this->modules, implode('.submodules.', $modulePathSegments));

        if (isset($moduleConfiguration['enabled']) && $moduleConfiguration['enabled'] !== true) {
            return false;
        }
        
        array_pop($modulePathSegments);

        if ($modulePathSegments === []) {
            return true;
        }

        return $this->isEnabled(implode('/', $modulePathSegments));
    }

    /**
     * Checks whether the current user has access to a module
     *
     * @param string $modulePath
     * @return boolean
     */
    public function isAllowed($moduleName)
    {
        $moduleConfiguration = $this->modules[$moduleName];
        if (
            isset($moduleConfiguration['privilegeTarget']) &&
            !$this->privilegeManager->isPrivilegeTargetGranted($moduleConfiguration['privilegeTarget'])
        ) {
            return true;
        }

        return false;
    }

    /**
     * Checks, whether a module is available to the current user
     *
     * @param  string $moduleName
     * @return boolean
     */
    public function isAvailable($moduleName)
    {
        return $this->isEnabled($moduleName) && $this->isAllowed($moduleName);
    }

    /**
     * @param string $methodName
     * @return boolean
     */
    public function allowsCallOfMethod($methodName)
    {
        return true;
    }
}
