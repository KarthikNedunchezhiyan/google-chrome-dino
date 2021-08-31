export class Position {
    constructor(y_pos, x_pos) {
        this._y_pos = y_pos;
        this._x_pos = x_pos;
    }

    get() {
        return [this._y_pos, this._x_pos];
    }

    clone() {
        return new Position(this._y_pos, this._x_pos);
    }
}

export class Velocity {
    constructor(y_speed, x_speed) {
        this._y_speed = y_speed;
        this._x_speed = x_speed;
    }

    get() {
        return [this._y_speed, this._x_speed];
    }

    sub(target_velocity) {
        this._y_speed -= target_velocity._y_speed;
        this._x_speed -= target_velocity._x_speed;
        return this;
    }

    add(target_velocity) {
        this._y_speed += target_velocity._y_speed;
        this._x_speed += target_velocity._x_speed;
        return this;
    }

    clone() {
        return new Velocity(this._y_speed, this._x_speed);
    }
}

export function applyVelocityToPosition(position, velocity) {
    return new Position(position._y_pos + velocity._y_speed, position._x_pos + velocity._x_speed);
}


export function isCollided(target1_y_pos, target1_x_pos, target1_height, target1_width, target2_y_pos, target2_x_pos, target2_height, target2_width) {
    let target1_top = target1_y_pos;
    let target1_bottom = target1_top + target1_height;
    let target1_left = target1_x_pos;
    let target1_right = target1_left + target1_width;

    let target2_top = target2_y_pos;
    let target2_bottom = target2_top + target2_height;
    let target2_left = target2_x_pos;
    let target2_right = target2_left + target2_width;


    return (target1_top < target2_bottom) && (target1_bottom > target2_top) && (target1_right > target2_left) && (target1_left < target2_right);
}