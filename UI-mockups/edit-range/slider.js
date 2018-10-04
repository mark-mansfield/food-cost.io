const slider = document.querySelector("#myRange")
const output = document.querySelector("#slider-value")
output.innerHTML = "0 %" // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    console.log(this.value)
    output.innerHTML = this.value   + " %"
}