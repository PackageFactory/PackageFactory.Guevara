import Immutable from 'immutable';

/**
 * A TYPO3CR node type
 */
export default class NodeType {
    constructor(nodeTypeName, schema, nodeTypeManager) {
        this.name = nodeTypeName;
        this.schema = Immutable.fromJS({
            abstract: false,
            aggregate: true,
            superTypes: {},
            ui: {
                icon: 'icon-square-o',
                inspector: {
                    groups: {},
                    tabs: {},
                    views: {}
                },
                label: '',
                position: 0
            },
            properties: {}
        }).mergeDeep(schema);

        this.nodeTypeManager = nodeTypeManager;
    }

    /**
     * Get the name
     *
     * @return {String} The name
     */
    getName() {
        return this.name;
    }

    /**
     * Get the label (falls bac to the node type name, if no label can be found)
     *
     * @return {String} The label
     */
    getLabel() {
        if (!this.schema.get('label')) {
            return this.name;
        }

        return this.schema.get('label');
    }

    /**
     * Is this node type abstract?
     *
     * @return {Boolean}
     */
    isAbstract() {
        return this.schema.get('abstract');
    }

    /**
     * Is this node type aggregated?
     *
     * @return {Boolean}
     */
    isAggregate() {
        return this.schema.get('aggregate');
    }

    /**
     * Does this type inherit from the given node type?
     *
     * @param  {String}  nodeTypeName The name of the node type to be checked
     * @return {Boolean}              True, if this node type inherits from `nodeTypeName`
     */
    isOfType(nodeTypeName) {
        if (!this.schema.superTypes) {
            return false;
        }

        return this.schema.superTypes.indexOf(nodeTypeName) !== -1;
    }

    /**
     * Get the entire schema
     *
     * @return {Object} The entire (immutable) schema
     */
    getSchema() {
        return this.schema;
    }
}
