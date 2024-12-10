const express = require('express');
const { User, Application, Tip, Reminder, Interview } = require('../models/user');
const { isDeepStrictEqual } = require('util');
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

    console.log("Data received by backend:", req.body);

    Application.create({
        // TODO: Does this work if the optional entries are not entered?
        // Simple fix would be to check if each attribute exists in req body, 
        // and set it if it does.
        companyName: req.body.companyName,
        userId: 1,
        position: req.body.position,
        location: req.body.location,
        contacts: req.body.contacts,
        status: req.body.status,
        previousStatus: req.body.previousStatus || null,
        dateApplied: req.body.dateApplied,
        dateDeleted: req.body.dateDeleted || null,
        deadline: req.body.deadline,
        hasStar: req.body.hasStar || null
    }).then(application => {
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
    }).catch(error => {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Internal Server Error' });
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

// get app by id
router.get('/application/:model/:id', [checkIDExist], async (req, res) => {

    console.log("in the backend");
    try {
        const application = await Application.findByPk(req.params.id);
        console.log('Fetched Application:', application);

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        res.status(200).json(application);
    } catch (error) {
        console.error(error);
    }
});

// Example route: Updating an application by id
router.put('/application/:id', async (req, res) => {
    try {
      const result = await Application.update(
        { status: req.body.status }, // Only update the status
        { where: { id: req.params.id } } // Match the application by ID
      );
  
      if (result[0] === 0) { // Sequelize returns an array, [0] means no rows were updated
        return res.status(404).json({ message: "Application not found" });
      }
  
      res.status(200).json({ message: "Application updated successfully" });
    } catch (error) {
      console.error("Error updating application:", error);
      res.status(500).json({ error: "Internal server error" });
    }
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

// delete router by id
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
  

// Soft delete an application by ID
router.put('/applications/soft-delete/:id', async (req, res) => {
    try {
        const result = await Application.update(
            { isDeleted: req.body.isDeleted ,
              dateDeleted: req.body.dateDeleted  
            }
            , // Only update the isDeleted
            { where: { id: req.params.id } } // Match the application by ID
          );
        
          if (result[0] === 0) { // Sequelize returns an array, [0] means no rows were updated
            return res.status(404).json({ message: "Application not found" });
          }
      
          res.status(200).json({ message: "Application updated successfully" });
        } catch (error) {
          console.error("Error updating application:", error);
          res.status(500).json({ error: "Internal server error" });
        }
});

// Fetch deleted applications
router.get('/applications/deleted', async (req, res) => {
    console.log('Fetching deleted applications...');
    try {
        const deletedApplications = await Application.findAll({
            where: { isDeleted: true },
        });
        console.log('Fetched deleted applications:', deletedApplications);
        res.status(200).json(deletedApplications)
    } catch (error) {
        console.error('Error fetching deleted applications:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Restore from trash
router.put('/applications/restore/:id', async (req, res) => {
    try {
        const result = await Application.update(
            {isDeleted: false,
             dateDeleted: null
            },
            {where: {id: req.params.id}}
        );
        
        if (result[0] === 0) { // Sequelize returns an array, [0] means no rows were updated
            return res.status(404).json({ message: "Application not found" });
          }
        
        res.status(200).json({ message: 'Application restored successfully' });
    } catch (error) {
        console.error('Error restoring application:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Permanently delete application by ID
router.delete('/applications/:id', async (req, res) => {
    try {
        const result = await Application.destroy({ where: { id: req.params.id } });
        
        if (result[0] === 0) { // Sequelize returns an array, [0] means no rows were updated
            return res.status(404).json({ message: "Application not found" });
          }

        res.status(200).json({ message: 'Application permanently deleted' });
    } catch (error) {
        console.error('Error permanently deleting application:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
