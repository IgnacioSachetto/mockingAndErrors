import { modelCart } from "../DAO/models/db/carts.model.db.js";

export function isAmdin(req, res, next) {
  if(req.session.email && req.session.admin == true) {
    return next();
  }
  return res.status(401).render('error-page', { msg: 'please log in as ADMIN!' });
}

export function isUser(req, res, next) {
  if (req.session.email) {
    console.log(req.session.email);
    return next();
  }
  return res.status(401).render('error-page', { msg: 'please log in!' });
}

export function isUserNotAdmin(req, res, next) {
  if (req.session.user.email && req.session.user.rol != 'Admin') {
    return next();
  }
  return res.status(401).render('error-page', { msg: 'please log in as regular user' });
}


export async function isUserOwner(req, res, next) {
  const cart = await modelCart.getCart(req.params.cid);
  if (req.user.email && req.user._id.toString()===cart.user.toString()) {
    return next();
  }
  return res.status(401).render('error-page', { msg: 'please log in AS ADMIN!' });
}