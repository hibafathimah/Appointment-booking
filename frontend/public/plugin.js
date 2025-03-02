function AppointmentPlugin(baseUrl) {
    document.addEventListener("DOMContentLoaded", function () {
      var appContainer = document.getElementById("appointment-plugin");
      if (!appContainer) {
        console.error("Element with id 'appointment-plugin' not found.");
        return;
      }
      
      appContainer.innerHTML = `
        <div class="appointment-wrapper">
          <!-- Booking Form Section -->
          <div class="booking-form-container">
            <h2 class="form-title">Book Appointment</h2>
            <form id="booking-form" class="booking-form">
              <input type="text" name="name" placeholder="Your Name" required class="form-input" />
              <input type="tel" name="phone" placeholder="Phone Number" required class="form-input" />
              <input type="date" name="date" required class="form-input" />
              <select name="timeSlot" required class="form-input">
                <option>Select Time Slot</option>
              </select>
              <button type="submit" class="form-button">Book Now</button>
            </form>
          </div>
          <!-- Booked Slots Section -->
          <div class="booked-slots-container">
            <h2 class="slots-title">Booked Slots</h2>
            <ul id="booked-slots" class="booked-slots-list"></ul>
          </div>
        </div>
      `;
  
      var form = document.getElementById("booking-form");
      var slotsList = document.getElementById("booked-slots");
      var timeSlotSelect = form.querySelector("select[name='timeSlot']");
  
      // Handle form submission for booking an appointment
      form.onsubmit = function (e) {
        e.preventDefault();
        var formData = new FormData(form);
        var data = {};
        formData.forEach(function (value, key) {
          data[key] = value;
        });
  
        fetch(baseUrl + "/api/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then(function (response) {
            if (response.ok) {
              alert("Appointment Booked Successfully!");
              form.reset();
              fetchSlots(data.date);
            } else {
              return response.json().then(function (error) {
                alert("Error: " + error.error);
              });
            }
          });
      };
  
      // Fetch available and booked slots for the selected date
      function fetchSlots(date) {
        slotsList.innerHTML = "Loading...";
        timeSlotSelect.innerHTML = "<option>Select Time Slot</option>";
  
        fetch(baseUrl + "/api/slots?date=" + date)
          .then(function (response) {
            if (response.ok) {
              return response.json();
            } else {
              slotsList.innerHTML = "Failed to fetch slots.";
              throw new Error("Failed to fetch slots");
            }
          })
          .then(function (data) {
            slotsList.innerHTML = "";
  
            // Display booked slots on the right
            data.bookedSlots.forEach(function (slot) {
              var li = document.createElement("li");
              li.textContent = slot;
              li.className = "booked-slot-item";
              slotsList.appendChild(li);
            });
  
            // Populate available slots in the select input
            data.availableSlots.forEach(function (slot) {
              var option = document.createElement("option");
              option.value = slot;
              option.textContent = slot;
              timeSlotSelect.appendChild(option);
            });
          })
          .catch(function (error) {
            console.error(error);
          });
      }
  
      // When the date changes, load the corresponding slots
      form.querySelector("input[name='date']").onchange = function (e) {
        fetchSlots(e.target.value);
      };
    });
  }
  