var before = document.getElementById("before");
var liner = document.getElementById("cursor-line");
var command = document.getElementById("typer");
var textarea = document.getElementById("texter");
var terminal = document.getElementById("terminal");

var git = 0;
var pw = false;
let pwd = false;
var commands = [];

setTimeout(function () {
  loopLines(banner, "", 80);
  textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);

// init
textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  }

  if (pw) {
    let et = "*";
    let w = textarea.value.length;

    command.innerHTML = et.repeat(w);

    if (textarea.value === password) {
      pwd = true;
    }

    if (pwd && e.keyCode == 13) {
      loopLines(secret, "info margin", 120);

      command.innerHTML = "";
      textarea.value = "";
      pwd = false;
      pw = false;

      liner.classList.remove("password");
    } else if (e.keyCode == 13) {
      addLine(
        "<br />Wrong password. Try again!<br /><br />",
        "error margin",
        0
      );

      command.innerHTML = "";
      textarea.value = "";
      pw = false;

      liner.classList.remove("password");
    }
  } else {
    if (e.keyCode == 13) {
      commands.push(command.innerHTML);
      git = commands.length;

      addLine(
        "user@ynncstslv.io~$ " + command.innerHTML,
        "no-animation tag",
        0
      );

      commander(command.innerHTML.toLowerCase());

      command.innerHTML = "";
      textarea.value = "";
    }

    if (e.keyCode == 38 && git != 0) {
      git -= 1;
      textarea.value = commands[git];
      command.innerHTML = textarea.value;
    }

    if (e.keyCode == 40 && git != commands.length) {
      git += 1;

      if (commands[git] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = commands[git];
      }

      command.innerHTML = textarea.value;
    }
  }
}

function commander(cmd) {
  switch (cmd.toLowerCase()) {
    case "whoami":
      loopLines(whoami, "margin", 80);
      break;
    case "experience":
      loopLines(experience, "margin", 80);
      break;
    case "portfolio":
      loopLines(portfolio, "error margin", 80);
      break;
    case "social":
      loopLines(social, "margin", 80);
      break;
    case "github":
      addLine("<br />Opening GitHub...<br /><br />", "comment margin", 0);
      newTab(github);
      break;
    case "linkedin":
      addLine("<br />Opening LinkedIn...<br /><br />", "comment margin", 0);
      newTab(linkedin);
      break;
    case "instagram":
      addLine("<br />Opening Instagram...<br /><br />", "comment margin", 0);
      newTab(instagram);
      break;
    case "contact":
      addLine(
        '<br />Opening mailto: <a href="mailto:yann@ynncstslv.io">yann@ynncstslv.io</a>...<br /><br />',
        "comment margin",
        80
      );
      newTab(email);
      break;
    case "secret":
      liner.classList.add("password");
      pw = true;
      break;
    case "sudo":
      addLine(
        "<br />Oh no, you're not admin...<br /><br />",
        "error margin",
        80
      );
      setTimeout(function () {
        window.open("https://www.youtube.com/watch?v=h7oqtfgvT64");
      }, 1000);
      break;
    case "password":
      addLine(
        "<br /><span class=\"info\"> Lol! You're joking, right? You're gonna have to try harder than that!ðŸ˜‚</span><br /><br />",
        "margin",
        100
      );
      break;
    case "history":
      addLine("<br />", "", 0);
      loopLines(commands, "comment", 80);
      addLine("<br />", "command", 80 * commands.length + 50);
      break;
      break;
    case "clear":
      setTimeout(function () {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");

        loopLines(banner, "", 80);
        textarea.focus();
      }, 1);
      break;
    case "help":
      loopLines(help, "description margin", 80);
      break;
    default:
      addLine(
        '<br /><span class="comment">Command not found. For a list of available commands, type <span class="command">\'help\'</span>.</span><br /><br />',
        "margin",
        100
      );
      break;
  }
}

function addLine(text, style, time) {
  var t = "";

  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }

  setTimeout(function () {
    var next = document.createElement("p");

    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function (item, index) {
    addLine(item, style, index * time);
  });
}

function newTab(link) {
  setTimeout(function () {
    window.open(link, "_blank");
  }, 500);
}

console.log(
  "%cYou hacked my password!ðŸ˜ ",
  "color: #ff5555; font-weight: bold; font-size: 24px;"
);
console.log(
  "%cPassword: '" + password + "' - I wonder what it does?ðŸ¤”",
  "color: #50fa7b"
);
