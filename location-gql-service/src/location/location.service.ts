import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { Location } from './entity/location.entity';
@Injectable()
export class LocationService {
    constructor(@InjectRepository(Location) private locatinRepository: Repository<Location>) { }

    create(project: CreateLocationInput): Promise<Location> {
        let location = this.locatinRepository.create(project);
        return this.locatinRepository.save(location) //you can directly use this without create. depends on DTO

    }

    async findAll(): Promise<Location[]> {
        return this.locatinRepository.find();
    }

    async findOne(id: string): Promise<Location> {
        return await this.locatinRepository.findOne(id);
    }

    update(id: string, updateLocationInput: UpdateLocationInput) {
        let location: Location = this.locatinRepository.create(updateLocationInput)
        location.id = id;
        return this.locatinRepository.save(location)
    }

    async remove(id: string) {
        let location = this.findOne(id)
        if (location) {
            let ret = await this.locatinRepository.delete(id)
            if (ret.affected === 1) {
                return location;
            }
        }
        throw new NotFoundException(`Record cannot find by id ${id}`)
    }
}
