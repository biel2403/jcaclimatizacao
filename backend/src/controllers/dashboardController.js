const { getDashboard } = require("../services/dashboardService");

async function dashboardController(_req, res, next) {
  try {
    res.json(await getDashboard());
  } catch (error) {
    next(error);
  }
}

module.exports = { dashboardController };
