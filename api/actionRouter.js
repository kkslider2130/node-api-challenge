const express = require("express");
const actions = require("../data/helpers/actionModel");
const project = require("../data/helpers/projectModel");
const router = express.Router();

router.post("/:id", validateId, (req, res) => {
  const newAction = {
    project_id: req.params.id,
    description: req.body.description,
    notes: req.body.notes,
    completed: req.body.completed,
  };
  actions
    .insert(newAction)
    .then(res.status(200).json(newAction))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "cannot post new action" });
    });
});

router.get("/:id/:actionId", validateId, validateActionId, (req, res) => {
  res.status(200).json(req.a);
});

router.put("/:id/:actionId", validateActionId, validateBody, (req, res) => {
  actions
    .update(req.params.actionId, req.body)
    .then(res.status(200).json(req.body))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error processing request" });
    });
});

router.delete("/:id/:actionId", validateId, validateActionId, (req, res) => {
  actions
    .remove(req.params.actionId)
    .then((a) => res.status(200).json(a))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "error while deleting" });
    });
});

function validateId(req, res, next) {
  const id = req.params.id;
  project
    .get(id)
    .then((p) => {
      if (p) {
        req.p = p;

        next();
      } else {
        res.status(404).json({ message: "ID not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "failed", err });
    });
}
function validateActionId(req, res, next) {
  const { actionId } = req.params;
  actions
    .get(actionId)
    .then((a) => {
      if (a) {
        req.a = a;
        next();
      } else {
        res.status(404).json({ message: "ID not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "failed", err });
    });
}
function validateBody(req, res, next) {
  const body = req.body;
  !body || body === {}
    ? res.status(400).json({ message: "please include action body" })
    : !body.description
    ? res.status(400).json({ message: "missing description" })
    : next();
}

module.exports = router;
