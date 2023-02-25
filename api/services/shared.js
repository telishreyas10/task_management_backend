const all = async (Model) => {
    try {
        const data = await Model.find({});
        return data;
    } catch (error) {
        return error;
    }
};

const get = async (Model, id) => {
    try {
        const data = await Model.findById(id);
        return data;
    } catch (error) {
        return error;
    }
};

const create = async (Model, body) => {
    try {
        const data = await Model.create(body);
        return data;
    } catch (error) {
        return error;
    }
};

const update = async (Model, id, body) => {
    try {
        const data = await Model.findByIdAndUpdate(id, body, {
            returnDocument: 'after'
        });
        return data;
    } catch (error) {
        return error;
    }
};

const remove = async (Model, id) => {
    try {
        const data = await Model.findByIdAndDelete(id);
        return data;
    } catch (error) {
        return error;
    }
};

module.exports = {
    all,
    create,
    get,
    update,
    remove
};