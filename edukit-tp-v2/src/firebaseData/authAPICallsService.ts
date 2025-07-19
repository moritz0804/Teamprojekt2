/// <reference types="vite/client" />

export class AuthAPICallsService {
  baseURL = import.meta.env.DEV
    ? "http://127.0.0.1:8000"
    : "https://api.edukit-tp.me";


    //New User API Call

    async newUserAPICall(id: string, name: string, email:string, picture: string): Promise<any> {
  const url = this.baseURL + "/users/new-user";
  const body = {
    id,
    email,
    name,
    picture
  };
   console.log("📦 Sending new user to backend:", body); 

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

    if (!response.ok) {
      const errorText = await response.text(); // Optional: besser debuggen
      throw new Error(`HTTP-Fehler bei Anfrage an API! Status: ${response.status}, Antwort: ${errorText}`);
    }

    const responseData = await response.json(); // ✅ FIXED
    return responseData;

  } catch (error: any) {
    console.error("newUserAPICall error:", error);
    throw error;
  }
}


//Update User API Call (Update Mail Address)


      async updatedMailAddressAPICall(name: string | null, email: string | null, id: string | null): Promise<any>{
        const url = this.baseURL + "/users/" + id + "/update";
        try{
            const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([email]),
        });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `❌ updateUserAPICall fehlgeschlagen! Status: ${response.status} ${response.statusText}, Antwort: ${errorText}`
        );
      }

      const responseData = await response.json();
      console.log("✅ updatedMailAddressAPICall erfolgreich:", responseData);
      return responseData;
    } catch (error: any) {
      console.error("❌ updatedMailAddressAPICall error:", error.message);
      throw error;
    }
  }

  // Hier kannst du weitere API-Methoden anhängen
}
