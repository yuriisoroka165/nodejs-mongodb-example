const service = require("../service");

const get = async (request, response, next) => {
    try {
        const results = await service.getAllTasks();
        response.json({
            status: "success",
            code: 200,
            data: {
                tasks: results,
            },
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getById = async (request, response, next) => {
    const { id } = request.params;
    try {
        const results = await service.getTaskById(id);
        if (results) {
            response.json({
                status: "success",
                code: 200,
                data: {
                    tasks: results,
                },
            });
        } else {
            response.status(404).json({
                status: "error",
                code: 404,
                message: `Not found task id ${id}`,
                data: "Not found",
            });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const create = async (request, response, next) => {
    const { title, text } = request.body;
    try {
        const result = await service.createTask({ title, text });

        response.status(201).json({
            status: "success",
            code: 201,
            data: { task: result },
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const update = async (request, response, next) => {
    const { id } = request.params;
    const { title, text } = request.body;
    try {
        const result = await service.updateTask(id, { title, text });
        if (result) {
            response.json({
                status: "success",
                code: 200,
                data: { task: result },
            });
        } else {
            response.status(404).json({
                status: "error",
                code: 404,
                message: `Not found task id: ${id}`,
                data: "Not Found",
            });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const updateStatus = async (request, response, next) => {
    const { id } = request.params;
    const { isDone = false } = request.body;

    try {
        const result = await service.updateTask(id, { isDone });
        if (result) {
            response.json({
                status: "success",
                code: 200,
                data: { task: result },
            });
        } else {
            response.status(404).json({
                status: "error",
                code: 404,
                message: `Not found task id: ${id}`,
                data: "Not Found",
            });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const remove = async (request, response, next) => {
    const { id } = request.params;

    try {
        const result = await service.removeTask(id);
        if (result) {
            response.json({
                status: "success",
                code: 200,
                data: { task: result },
            });
        } else {
            response.status(404).json({
                status: "error",
                code: 404,
                message: `Not found task id: ${id}`,
                data: "Not Found",
            });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = {
    get,
    getById,
    update,
    remove,
    updateStatus,
    create,
};
