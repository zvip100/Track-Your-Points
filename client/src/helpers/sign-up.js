import { URL } from "../main";

export async function verifyEmail(email) {
  try {
    const response = await fetch(`${URL}/api/create-account/verify-email`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const result = await response.json();
    console.log("Verify email result: ", result);

    if (result === "user not found") {
      return { error: result };
    }
    return result;
  } catch (e) {
    console.error("Error verifying email: ", e.message);
    return { error: e.message };
  }
}

export async function getOtp(email) {
  try {
    const response = await fetch(`${URL}/api/create-account/get-otp`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const result = await response.json();
    console.log("Get otp result: ", result);

    return result;
  } catch (e) {
    console.error("Error getting OTP: ", e.message);
    return { error: e.message };
  }
}

export async function verifyOtp(email, otp) {
  try {
    const response = await fetch(`${URL}/api/create-account/verify-otp`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const result = await response.json();
    console.log("Verify OTP result: ", result);

    if (result === "Invalid OTP") return { error: result };

    return result;
  } catch (e) {
    console.error("Error verifying OTP: ", e.message);
    return { error: e.message };
  }
}

export async function createAccount(email, password) {
  try {
    const response = await fetch(`${URL}/api/create-account/sign-up`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + signUp.statusText);
    }

    const result = await response.json();
    console.log("Create account result: ", result);

    return result;
  } catch (e) {
    console.error("Error creating account: ", e.message);
    return { error: e.message };
  }
}
