import Label from "../models/Label";
import Note from "../models/Note";

export const LABLES = [
    new Label("l1", "React Native"),
    new Label("l2", "Final Exam"),
    new Label("l3", "Mini Project"),
    new Label("l4", "Team Work"),
    new Label("l5", "React Basic"),
];
export const COLORS = [
    "lightseagreen",
    "skyblue",
    "lightcoral",
    "lightpink",
    "lightgreen",
    "lightblue",
    "orange",
    "palegreen",
    "lightsalmon",
    "lightyellow",
    "lightsteelblue",
    "lightcyan",
    "lightgoldenrodyellow",
    "lightgray",
    "lightgrey",
    "lightseagreen",
    "lightpink",
    "lightcoral",
    "lightgreen",
    "lightblue",
    "lightcyan",
    "lightyellow",
    "lightsteelblue",
    "lightsalmon",
    "lightgoldenrodyellow",
    "lightgray",
    "lightgrey",
    "lightcoral",
    "lightseagreen",
    "lightgreen",
    "lightblue",
    "lightcyan",
    "lightyellow",
    "lightsteelblue",
    "lightsalmon",
    "lightgoldenrodyellow",
    "lightgray",
    "lightgrey",
];

export const NOTES = [
    new Note(
        "n1",
        null,
        ["l1", "l2"],
        "Final project Preparation",
        new Date("2024-5-10T12:30:30"),
        false
    ),
    new Note(
        "n2",
        COLORS[3],
        ["l3"],
        "For our mini project!",
        new Date("2024-5-10T12:30:30"),
        true
    ),
    new Note(
        "n3",
        COLORS[4],
        ["l2"],
        "Second mii project",
        new Date("2024-5-10T12:30:30"),
        false
    ),
    new Note(
        "n4",
        COLORS[5],
        ["l4", "l5"],
        "learn React Native Navigation",
        new Date("2024-5-20T12:25:00"),
        false
    ),
];
export const TRASH = [
    new Note(
        "n5",
        null,
        ["l1", "l2"],
        "Final project Preparation",
        new Date("2024-5-10T12:30:30"),
        false
    ),
    new Note(
        "n6",
        COLORS[3],
        ["l3"],
        "For our mini project!",
        new Date("2024-5-10T12:30:30"),
        true
    ),
    new Note(
        "n7",
        COLORS[4],
        ["l2"],
        "Second mii project",
        new Date("2024-5-10T12:30:30"),
        false
    ),
];
