

export const errorNotifications = (message)=>{
    console.log(message)
switch (message) {
    case "Firebase: Error (auth/email-already-in-use).":
        this.toast.show("Email is already in use", 2500);
        break;
        case "Firebase: Error (auth/user-not-found).":
        this.toast.show("User not found", 2500);
        break;
        case "Firebase: Error (auth/wrong-password).":
            this.toast.show("Email or password is incorrect", 2500);
            break;

    default:
        this.toast.show("Something went wrong", 2500);
        break;
}

}