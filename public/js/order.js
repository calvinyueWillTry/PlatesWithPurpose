
function addItem(menu_id){
    
    fetch('/api/plate/order', {
        method: 'POST',
        body: JSON.stringify({ menu_id: menu_id }),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Could not create order');
        }
        return response.json();
        })
        .then(newPlate => {
            // Redirect to view order
            document.location.replace(`/api/plate/order/${newPlate.id}`);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
