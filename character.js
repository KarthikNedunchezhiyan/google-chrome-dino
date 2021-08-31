const { applyVelocityToPosition, Velocity } = require("./physics");

export class CharacterMeta {
    constructor(movements_array, movement_delay, position, velocity) {
        this._movements_array = movements_array;
        this._position = position;
        this._velocity = velocity;
        this._movement_delay = movement_delay;
    }

    clone() {
        return new CharacterMeta(
            [...this._movements_array],
            this._movement_delay,
            this._position.clone(),
            this._velocity.clone()
        );
    }
}

export class Character {
    constructor(character_meta) {
        this._character_meta = character_meta;
        this._tick_counter = 0;
        this._movement_delay_counter = 0;
    }

    tick() {
        this._movement_delay_counter++;
        if (this._movement_delay_counter > this._character_meta._movement_delay) {
            this._movement_delay_counter = 0;
            this._tick_counter += 1;
            this.set_position(applyVelocityToPosition(this._character_meta._position, this._character_meta._velocity));
        }
    }

    get_layout() {
        return this._character_meta._movements_array[this._tick_counter % this._character_meta._movements_array.length];
    }

    get_position() {
        return this._character_meta._position;
    }

    set_position(new_position) {
        this._character_meta._position = new_position;
    }

    get_velocity() {
        return this._character_meta._velocity;
    }
}

export class AllocatorCharacterArray {
    constructor() {
        this._character_array = [];
    }

    add_character(character_meta, probability) {
        this._character_array.push([character_meta, probability]);
        return this;
    }
}

export class CharacterAllocator {
    constructor(allocator_character_array, min_gap, gap_random_max) {
        this._allocator_character_array = allocator_character_array;
        this._min_gap = min_gap;
        this._gap_random_max = gap_random_max;
        this._pending_gap = 0;
    }

    tick() {
        this._pending_gap -= 1;
    }

    get_character() {
        if (this._pending_gap > 0) {
            return false;
        }

        const RANDOM = Math.random();
        for (let i = 0; i < this._allocator_character_array._character_array.length; i++) {
            if (RANDOM >= this._allocator_character_array._character_array[i][1]) {
                const RANDOM_CHARACTER = new Character(this._allocator_character_array._character_array[i][0].clone());
                this._pending_gap = this._min_gap + Math.ceil(Math.random() * this._gap_random_max);
                return RANDOM_CHARACTER;
            }
        }
    }
}