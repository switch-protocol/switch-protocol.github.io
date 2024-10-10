// Store the links in an object
const links = {
    artist_one_social: "https://soundcloud.com/keefemusic",
    artist_two_social: "https://soundcloud.com/nathaniel_pavel",
    artist_three_social: "https://soundcloud.com/mikext",
    artist_one_sound: "https://soundcloud.com/keefemusic",
    artist_two_sound: "https://soundcloud.com/nathaniel_pavel",
    artist_three_sound: "https://soundcloud.com/mikext",
    location_link: "https://www.google.com/maps/place/2011+W+North+Ave,+Chicago,+IL+60647,+USA/@41.9102697,-87.6786115,19z/data=!3m1!4b1!4m6!3m5!1s0x880fd2b8a7224829:0x6de43eb4ecc04f3c!8m2!3d41.9102687!4d-87.6779678!16s%2Fg%2F11b8z17mmr?entry=ttu&g_ep=EgoyMDI0MTAwNy4xIKXMDSoASAFQAw%3D%3D",
    calendar_link: "https://calendar.google.com/calendar/share?slt=1AUWfa3gsRAQSLAmE-NqxPo_2UZuHul4EJiTR0JdQI5N0AtkIiRuWVwoXuqMkSuxqcaWoadotfRzBZQ",
    ra_link: "https://ra.co/events/2009773",
    instagram_link:"https://www.instagram.com/switch_protocol_/"
  };

// Find all links with the class 'link'
document.querySelectorAll('.link').forEach(function(anchor) {
    // Get the URL reference from the data-url attribute
    const urlKey = anchor.getAttribute('data-url');
  
    // Set the href of the link dynamically
    if (links[urlKey]) {
      anchor.href = links[urlKey];
    }
  });