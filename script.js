function validateForm() {
    let errors = ``;
    let receipt = `<table class="table table-bordered"><tbody>`;

    // Add constants and new variables for calculations here///////
    const REWARDS_PERCENTAGE_10 = 0.1;
    const REWARDS_PERCENTAGE_15 = 0.15;
    const REWARDS_PERCENTAGE_20 = 0.2;

    // Form field validations ...

    let customerName = document.getElementById("customerName").value;
    let customerNameRegEx = /^\w+\s\w+$/;
    if (!customerNameRegEx.test(customerName)) {
        errors += `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <span>Please enter a valid customer name (only one space between First and Last name!)</span>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    } else {
        receipt += `<tr>
            <td style="text-align: center; border: 1px solid black;"><b>Customer Name:</b></td>
            <td style="border: 1px solid black;">${customerName}</td>
        </tr>`;
    }

    let customerNumber = document.getElementById("customerNumber").value;
    let customerNumberRegEx = /^\d{5}[A-Za-z]{2}$/;
    if (!customerNumberRegEx.test(customerNumber)) {
        errors += `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <span>Please enter a valid customer number (5 numbers and 2 alphabets)</span>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    } else {
        receipt += `<tr>
            <td style="text-align: center; border: 1px solid black;"><b>Customer Number:</b></td>
            <td style="border: 1px solid black;">${customerNumber}</td>
        </tr>`;
    }

    let customerEmail = document.getElementById("customerEmail").value;
    let customerEmailRegEx = /^\w+@\w+\.\w+$/;
    if (!customerEmailRegEx.test(customerEmail)) {
        errors += `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <span>Please enter a valid email address</span>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    } else {
        receipt += `<tr>
            <td style="text-align: center; border: 1px solid black;"><b>Customer Email:</b></td>
            <td style="border: 1px solid black;">${customerEmail}</td>
        </tr>`;
    }

    let totalCostOfClothings = parseFloat(document.getElementById("totalCostOfClothings").value);
    let totalCostOfClothingsRegEx = /^(?!0*(\.0+)?$)(\d+)(\.\d+)?$/;
    if (!totalCostOfClothingsRegEx.test(totalCostOfClothings.toString())) {
        errors += `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <span>Please enter a valid cost of clothings in numbers, can not be 0 or negative number</span>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    }

    let totalCostOfAccessories = parseFloat(document.getElementById("totalCostOfAccessories").value);
    // let totalCostOfAccessoriesRegEx = /^(?:(?!0+$|0+\.\d*$)(\d+(\.\d+)?))?$/;
    ///////////////////correction////////////////////////
    let totalCostOfAccessoriesRegEx = /^(?!0+$)(?!-).*?(?:\d+(\.\d+)?|\.\d+)?$/;
    /////////////////////correction//////////////////////
    if (!totalCostOfAccessoriesRegEx.test(totalCostOfAccessories.toString())) {
        errors += `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <span>You can leave cost of accessories empty, but can not be 0 or negative number</span>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    }
    ///////////////correction/////////////////////////
    else {
        totalCostOfAccessories = 0;
    }
    /////////////////correction///////////////////////
    let rewardsReceived = parseFloat(document.getElementById("rewardsReceived").value);
    let rewardsReceivedRegEx = /^(0|[1-9]\d*)(\.\d+)?$/;
    if (!rewardsReceivedRegEx.test(rewardsReceived.toString())) {
        errors += `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <span>Please enter a valid rewards received value, can be 0 but can not be negative number</span>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    } else {
        receipt += `<tr>
            <td style="text-align: center; border: 1px solid black;"><b>Rewards Received:</b></td>
            <td style="border: 1px solid black;">${"$" + rewardsReceived}</td>
        </tr>`;
    }

    // Calculations
    let totalPurchase = totalCostOfClothings + totalCostOfAccessories;
    let totalRewards = 0;

    if (totalPurchase < 2500) {
        totalRewards = totalPurchase * REWARDS_PERCENTAGE_10;
    } else if (totalPurchase >= 2500 && totalPurchase <= 4000) {
        totalRewards = totalPurchase * REWARDS_PERCENTAGE_15;
    } else if (totalPurchase > 4000) {
        totalRewards = totalPurchase * REWARDS_PERCENTAGE_20;
    }

    let rewardsPending = totalRewards - rewardsReceived;

    receipt += `<tr>
    <td style="text-align: center; border: 1px solid black;"><b>Total Purchase:</b></td>
    <td style="border: 1px solid black;">${"$" + totalPurchase.toFixed(2)}</td>
    </tr>`;

    receipt += `<tr>
    <td style="text-align: center; border: 1px solid black;"><b>Total Rewards:</b></td>
    <td style="border: 1px solid black;">${"$" + totalRewards.toFixed(2)}</td>
    </tr>`;

    receipt += `<tr>
        <td style="text-align: center; border: 1px solid black;"><b>Rewards Pending:</b></td>
        <td style="border: 1px solid black;">${"$" + rewardsPending.toFixed(2)}</td>
    </tr>`;

    receipt += `</tbody></table>`;

    // Errors or receipt
    if (errors) {
        // Show the errors
        document.getElementById("errors").innerHTML = errors;
        // Clear the receipt
        document.getElementById("receipt").innerHTML = "";
    } else {
        // Clear the errors
        document.getElementById("errors").innerHTML = "";
        // Show the receipt
        document.getElementById("receipt").innerHTML = receipt;
    }

    // Return false to prevent the form from submitting
    return false;
}
