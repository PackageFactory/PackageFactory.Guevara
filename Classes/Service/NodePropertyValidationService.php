<?php
declare(strict_types=1);

/*
 * This file is part of the Neos.Neos.Ui package.
 *
 * (c) Contributors of the Neos Project - www.neos.io
 *
 * This package is Open Source Software. For the full copyright and license
 * information, please view the LICENSE file which was distributed with this
 * source code.
 */

namespace Neos\Neos\Ui\Service;

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Log\SystemLoggerInterface;
use Neos\Flow\Validation\Validator\ValidatorInterface;

/**
 * @Flow\Scope("singleton")
 */
class NodePropertyValidationService
{

    /**
     * @Flow\Inject
     * @var SystemLoggerInterface
     */
    protected $logger;

    /**
     * @param $value
     * @param string $validatorName
     * @param array $validatorConfiguration
     * @return bool
     */
    public function validate($value, string $validatorName, array $validatorConfiguration): bool
    {
        $validator = $this->resolveValidator($validatorName, $validatorConfiguration);

        if ($validator === null) {
            return true;
        }

        $result = $validator->validate($value);
        return !$result->hasErrors();
    }

    /**
     * @param string $validatorName
     * @param array $validatorConfiguration
     * @return ValidatorInterface|null
     */
    protected function resolveValidator(string $validatorName, array $validatorConfiguration)
    {
        $nameParts = explode('/', $validatorName);
        if (!$nameParts[0] === 'Neos.Neos') {
            $this->logger->log(sprintf('The custom frontend property validator %s" is used. This property is not validated in the backend.', $validatorName), LOG_INFO);
            return null;
        }

        $fullQualifiedValidatorClassName = '\\Neos\\Flow\\Validation\\Validator\\' . end($nameParts);

        if (!class_exists($fullQualifiedValidatorClassName)) {
            $this->logger->log(sprintf('Could not find a backend validator fitting to the frontend validator "%s"', $validatorName), LOG_WARNING);
            return null;
        }

        return new $fullQualifiedValidatorClassName($validatorConfiguration);
    }
}
