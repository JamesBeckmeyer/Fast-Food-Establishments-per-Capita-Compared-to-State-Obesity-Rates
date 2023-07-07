-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/2qBujY
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Obesity" (
    "State" varchar   NOT NULL,
    "Prevalence" float   NOT NULL,
    "95%CI" varchar   NOT NULL,
    CONSTRAINT "pk_Obesity" PRIMARY KEY (
        "State"
     )
);

CREATE TABLE "FastFood" (
    "State" varchar   NOT NULL,
    "All_fast_food_restaurants" float   NOT NULL,
    "Full-service_restaurants" float   NOT NULL,
    "Subway" float   NOT NULL,
    "Starbucks" float   NOT NULL,
    "McDonalds" float   NOT NULL,
    "Dunkin_Donut" float   NOT NULL,
    "Burger_King" float   NOT NULL,
    "Taco_Bell" float   NOT NULL,
    "Dominos" float   NOT NULL,
    "Wendys" float   NOT NULL,
    "Dairy_Queen" float   NOT NULL
);

ALTER TABLE "FastFood" ADD CONSTRAINT "fk_FastFood_State" FOREIGN KEY("State")
REFERENCES "Obesity" ("State");
