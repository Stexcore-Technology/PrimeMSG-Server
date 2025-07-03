import { Service } from "@stexcore/api-engine";
import InstanceModel from "../models/instance.model";
import "./db.service";

/**
 * Manage instances service
 */
export default class InstancesService extends Service {

    /**
     * Get All instances
     * @param user_id User identifier
     * @returns All instances
     */
    public async GetAllInstances(user_id: number) {
        // Get Instance model
        const Instance = this.model$(InstanceModel);

        // instances data
        const instances = await Instance.findAll({
            where: {
                user_id: user_id
            }
        });

        // Instances Info
        return instances.map((instanceItem) => (
            instanceItem.toJSON()
        ));
    }

    /**
     * Get instance item
     * @param instance_id Instance identifier
     * @param user_id User identifier
     * @returns Get instance
     */
    public async GetInstanceItem(instance_id: number, user_id: number) {
        // Instance
        const Instance = this.model$(InstanceModel);

        // instances info
        const instanceItem = await Instance.findOne({
            where: {
                id: instance_id,
                user_id: user_id,
            }
        });

        return instanceItem?.toJSON() ?? null;
    }

    /**
     * Create a new instance item
     * @param data Value to creation 
     * @returns Instance Item
     */
    public async CreateInstance(data: { user_id: number, name: string, platform: string }) {
        // Instance
        const Instance = this.model$(InstanceModel);

        // Instance created
        const instance = await Instance.create({
            user_id: data.user_id,
            name: data.name,
            platform: data.platform
        });

        return instance;
    }

    /**
     * update instance by instance identifier
     * @param instance_id Instance identifier
     * @param user_id User owner identifier
     * @param data Data to update
     * @returns nCount affected
     */
    public async UpdateInstance(instance_id: number, user_id: number, data: { name: string, platform: string }) {
        // Get instance
        const Instance = this.model$(InstanceModel);
        
        // Instance updated
        const [countUpdated] = await Instance.update({
            ...data
        }, {
            where: {
                id: instance_id,
                user_id: user_id,
            }
        });

        return countUpdated;
    }

    /**
     * Delete instance
     * @param instance_id Instance identifier
     * @param user_id User identifier
     */
    public async DeleteInstance(instance_id: number, user_id: number) {
        // Get instance
        const Instance = this.model$(InstanceModel);
        
        // Destroy instance
        const countDeleted = await Instance.destroy({
            where: {
                id: instance_id,
                user_id: user_id
            }
        });

        return countDeleted;
    }


    
}