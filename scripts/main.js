// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed
$(document).ready(function () {
  AOS.init({
    // uncomment below for on-scroll animations to played only once
    // once: true
  }); // initialize animate on scroll library
});

// Smooth scroll for links with hashes
$("a.smooth-scroll").click(function (event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: target.offset().top,
        },
        1000,
        function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            // Checking if the target was focused
            return false;
          } else {
            $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        }
      );
    }
  }
});

// Photo Filter
var activeFilter = "all";

$(".ww-filter-button").on("click", function (e) {
  // remove btn-primary from all buttons first
  $(".ww-filter-button").removeClass("btn-primary");
  $(".ww-filter-button").addClass("btn-outline-primary");

  // add btn-primary to active button
  var button = $(this);
  button.removeClass("btn-outline-primary");
  button.addClass("btn-primary");
  filterItems(button.data("filter"));
  e.preventDefault();
});

function filterItems(filter) {
  if (filter === activeFilter) {
    return;
  }

  activeFilter = filter;
  $(".ww-gallery .card").each(function () {
    var card = $(this);
    var groups = card.data("groups");
    var show = false;
    if (filter === "all") {
      show = true;
    } else {
      for (var i = 0; i < groups.length; i++) {
        if (groups[i] === filter) {
          show = true;
        }
      }
    }
    // hide everything first
    card.fadeOut(400);
    setTimeout(function () {
      if (show && !card.is(":visible")) {
        card.fadeIn(400);
      }
    }, 500);
  });
}

// Light Box
$(document).on("click", '[data-toggle="lightbox"]', function (event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});

function updateCountdown() {
  const targetDate = new Date("September 20, 2024 18:00:00").getTime();

  const now = new Date().getTime();
  const timeLeft = targetDate - now;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  if (timeLeft < 0) {
    // If the countdown is finished, display a message and add a new container with a new class
    const countdownContainer = document.querySelector(".countdown");
    countdownContainer.innerHTML = ""; // Clear the existing countdown

    // Create a new container with a new class
    const messageContainer = document.createElement("div");
    messageContainer.className = "countdown-ended";
    messageContainer.textContent = "წვეულება დაიწყო";

    // Append the new container to the countdown container
    countdownContainer.appendChild(messageContainer);
  } else {
    // Update the HTML content with the time left, ensuring two digits are displayed
    document.getElementById("days").innerHTML = `${String(days).padStart(
      2,
      "0"
    )} <small>დღე</small>`;
    document.getElementById("hours").innerHTML = `${String(hours).padStart(
      2,
      "0"
    )} <small>საათი</small>`;
    document.getElementById("minutes").innerHTML = `${String(minutes).padStart(
      2,
      "0"
    )} <small>წუთი</small>`;
    document.getElementById("seconds").innerHTML = `${String(seconds).padStart(
      2,
      "0"
    )} <small>წამი</small>`;
  }
}

// Update the countdown every second
setInterval(updateCountdown, 1000);

document.getElementById("scroll-down").addEventListener("click", function () {
  document.getElementById("rsvp").scrollIntoView({ behavior: "smooth" });
});

window.addEventListener("scroll", function () {
  if (window.scrollY > 60) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
});
