import Task from "../models/task.js";

const createTask = async (req, res) => {
  try {
    // const task = new Task(req.body);
    const task = new Task({
      ...req.body,
      ownerId : req.user._id
    })

    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  const match = { ownerId: req.user._id }
  
  if(req.query.completed){
    match.completed = req.query.completed === 'true'
  }
  const limit = parseInt(req.query.limit) || 5
  const skip = parseInt(req.query.skip) || 0
  const sort = {}

  if(req.query.sortBy){
    const parts = req.query.sortBy.split(':')
    sort[parts[0]]= parts[1]==='desc' ? -1 : 1
  }

  try {
      const tasks = await Task.find(match).limit(limit).skip(skip).sort(sort)
      res.send(tasks);
  } catch (error) {
    res.status(500).send({ error: "Error fetching tasks" });
  }
};

const getTaskById = async (req,res) => {
  const _id = req.params.id
  try {
    const task = await Task.findOne({ _id, ownerId : req.user._id})

    if(!task){
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(500).send('Unable to fetch dure sever error')
  }
}

const updateTaskById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const task = await Task.findOne({ 
      _id: req.params.id, 
      ownerId: req.user._id 
    });
    
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    updates.forEach(update => task[update] = req.body[update]);
    await task.save();
    
    res.send(task);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ 
      _id: req.params.id, 
      ownerId: req.user._id 
    });

    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    res.send(task);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
}

export { createTask, getAllTasks, updateTaskById, deleteTask,getTaskById };