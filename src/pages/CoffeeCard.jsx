function CoffeeCard({ c }){
    return(
        <div className="coffee-card">
            <h2>{c.name}</h2>
            <h2>{c.description}</h2>
            <h2>{c.price}</h2>
        </div>
    )
}

export default CoffeeCard;