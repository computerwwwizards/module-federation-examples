#[macro_use] extern crate rocket;

use rocket::serde::Serialize;
use rocket_dyn_templates::{Template, context};

#[derive(Serialize)]
struct HelloContext<'a> {
    title: &'a str,
    name: &'a str,
}

#[derive(Serialize)]
struct AboutContext<'a> {
    title: &'a str,
    content: &'a str,
}

#[get("/")]
fn index() -> Template {
    let ctx = HelloContext { title: "Home", name: "Visitor" };
    Template::render("index", &ctx)
}

#[get("/about")]
fn about() -> Template {
    let ctx = AboutContext { title: "About", content: "This is a simple Rocket + Handlebars demo." };
    Template::render("about", &ctx)
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(Template::fairing())
        .mount("/", routes![index, about])
}
