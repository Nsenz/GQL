export const getColor = (role: 'ADMIN' | 'MODERATOR') => {
    switch(role){
        case "ADMIN":
            return 'danger';
        case "MODERATOR":
            return 'warning';
        default:
            return 'standard';
    }
}