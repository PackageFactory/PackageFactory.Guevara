<?php
namespace PackageFactory\Guevara\Domain\Model;

use TYPO3\TYPO3CR\Domain\Model\NodeInterface;

/**
 * An interface to describe a change
 */
interface ChangeInterface
{

    /**
     * Set the subject
     *
     * @param NodeInterface $subject
     * @return void
     */
    public function setSubject(NodeInterface $subject);

    /**
     * Get the subject
     *
     * @return NodeInterface
     */
    public function getSubject();

    /**
     * Checks whether this change can be merged with a subsequent change
     *
     * @param  ChangeInterface $subsequentChange
     * @return boolean
     */
    public function canMerge(ChangeInterface $subsequentChange);

    /**
     * Merges this change with a subsequent change
     *
     * @param  ChangeInterface $subsequentChange
     * @return void
     */
    public function merge(ChangeInterface $subsequentChange);

    /**
     * Checks whether this change can be applied to the subject
     *
     * @return boolean
     */
    public function canApply();

    /**
     * Applies this change
     *
     * @return void
     */
    public function apply();

}
