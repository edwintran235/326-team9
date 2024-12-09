const express = require('express');
const { User, Application, Tip, Reminder, Interview } = require('../models/user');
const router = express.Router();

const checkIDExist = (req, res, next) => {
    const modelMap = {
        user: User,
        application: Application,
        tip: Tip,
        reminder: Reminder,
        interview: Interview
    };
    const model = modelMap[req.params.model];
    if (!model) return res.status(400).json({ error: "Invalid model type" });

    model.count({ where: { id: req.params.id } }).then(count => {
        if (count > 0) {
            next();
        } else {
            res.status(404).json({ error: "Record not found" });
        }
    }).catch(err => res.status(500).json({ error: err.message }));
};


// Example route: Creating Application
router.post('/application', (req, res) => {
    Application.create({
        // TODO: Does this work if the optional entries are not entered?
        // Simple fix would be to check if each attribute exists in req body, 
        // and set it if it does.
        companyName: req.body.companyName,
        position: req.body.position,
        location: req.body.location,
        contacts: req.body.contacts,
        status: req.body.status,
        previousStatus: req.body.previousStatus,
        dateApplied: req.body.dateApplied,
        dateDeleted: req.body.dateDeleted,
        hasStar: req.body.hasStar
    }).then(application => {
        /*console.log(application.get({
            plain: true
        }));*/
        res.status(200).json(application);
    }).catch(err => {
        res.status(405).json('Error has occurred: ' + `${err.message}`);
    });
});

// Create Reminder
router.post('/reminder', (req, res) => {

    console.log("Data received by backend:", req.body);

    Reminder.create({
        date: req.body.date,
        description: req.body.description
    }).then(reminder => {
        res.status(200).json(reminder);
    }).catch(err => {
        res.status(400).json('Error has occured: ' + `${err.message}`);
    });
});


// Example route: Get All Applications
router.get('/application', (req, res) => {
    //console.log('Getting all apps');
    Application.findAll().then(application => {
        res.status(200).json(application);
    });
});

// Get All Reminders
router.get('/reminder', (req, res) => {
    Reminder.findAll().then(reminders => {
        res.status(200).json(reminders);
    })
    .catch(err => {
        res.status(500).json({ error: `Error retrieving reminders: ${err.message}` });
    });
});

// Example route: Get Application by id
router.get('/application/:id', [checkIDExist], (req, res) => {
    //console.log('Get app by id');
    Application.findByPk
    (req.params.id).then(application => {
        //console.log(application);
        res.status(200).json(application);
    });
});

// Example route: Updating an application by id
router.put('/application/:id', [checkIDExist], (req, res) => {
    //console.log('Update book by id');
    Application.update({
        companyName: req.body.companyName,
        position: req.body.position,
        location: req.body.location,
        contacts: req.body.contacts,
        status: req.body.status,
        previousStatus: req.body.previousStatus,
        dateApplied: req.body.dateApplied,
        dateDeleted: req.body.dateDeleted,
        hasStar: req.body.hasStar
    },{
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

// Example route: Deleting an application by id
router.put('/application/:id/delete', [checkIDExist], (req, res) => {
    Application.update({
        is_deleted: true,
        dateDeleted: new Date(),
    }, {
        where: { id: req.params.id },
    }).then(result => {
        res.status(200).json({ message: 'Application moved to trash.', result });
    }).catch(err => {
        res.status(500).json({ error: `Error deleting application: ${err.message}` });
    });
});

// Example route: Create a route to retrieve applications where is_deleted is true
router.get('/applications/deleted', (req, res) => {
    Application.findAll({
        where: { is_deleted: true },
    }).then(applications => {
        res.status(200).json(applications);
    }).catch(err => {
        res.status(500).json({ error: `Error fetching deleted applications: ${err.message}` });
    });
});

// Example route: Restore from trash
router.put('/application/:id/restore', [checkIDExist], (req, res) => {
    Application.update({
        is_deleted: false,
        dateDeleted: null, 
    }, {
        where: { id: req.params.id },
    }).then(result => {
        res.status(200).json({ message: 'Application restored.', result });
    }).catch(err => {
        res.status(500).json({ error: `Error restoring application: ${err.message}` });
    });
});



// Example route: Delete user by id
router.delete('/user/:id', [checkIDExist], (req, res) => {
    //console.log('Delete book by id');
    User.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/reminder/:id', async (req, res) => {
    try {
      const reminderId = req.params.id;
      const deleted = await Reminder.destroy({ where: { id: reminderId } });
      if (deleted) {
        res.status(200).json({ message: 'Reminder deleted successfully' });
      } else {
        res.status(404).json({ error: 'Reminder not found' });
      }
    } catch (error) {
      console.error("Error deleting reminder:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Example route: Create an Interview Note
router.post('/interview-notes', async (req, res) => {
    try {
        const appExists = await Application.findByPk(req.body.applicationId);
        if (!appExists) return res.status(404).json({ error: 'Application not found.' });

        const note = await Interview.create({
            applicationId: req.body.applicationId,
            interview_date: req.body.interview_date,
            interview_format: req.body.interview_format,
            notes: req.body.notes,
        });
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ error: `Error adding note: ${err.message}` });
    }
});

// Example route: Fetch notes for specific application
router.get('/interview-notes/:applicationId', (req, res) => {
    Interview.findAll({
        where: { applicationId: req.params.applicationId },
    }).then(notes => {
        res.status(200).json(notes);
    }).catch(err => {
        res.status(500).json({ error: `Error retrieving notes: ${err.message}` });
    });
});

// Example route: Update an existing interview note
router.put('/interview-notes/:id', (req, res) => {
    Interview.update({
        interview_date: req.body.interview_date,
        interview_format: req.body.interview_format,
        notes: req.body.notes,
    }, {
        where: { id: req.params.id },
    }).then(result => {
        res.status(200).json({ message: 'Note updated.', result });
    }).catch(err => {
        res.status(500).json({ error: `Error updating note: ${err.message}` });
    });
});

// Example route: Delete an existing Interview note
router.delete('/interview-notes/:id', (req, res) => {
    Interview.destroy({
        where: { id: req.params.id },
    }).then(result => {
        if (result) {
            res.status(200).json({ message: 'Note deleted.' });
        } else {
            res.status(404).json({ error: 'Note not found.' });
        }
    }).catch(err => {
        res.status(500).json({ error: `Error deleting note: ${err.message}` });
    });
});

module.exports = router;
