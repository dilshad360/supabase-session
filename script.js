const { createClient } = supabase

supabase = createClient(
    'https://xyzcompany.supabase.co',
    'public-anon-key'
    )

const form = document.querySelector('#contact-form')
form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const formInputs = form.querySelectorAll('input, textarea')


    let submitData = {}

    formInputs.forEach(element => {
        const { value, name } = element
        if (value) {
            submitData[name] = value
        }
    })

    console.log(submitData)

    const { data, error } = await supabase.from('entries').insert([submitData])

    if (error) {
        alert("Sorry something went wrong try again")
    } else {
        alert("Thank you for contacting us")
    }

})




let fetchData = async () => {

    const { data, error } = await supabase.from('entries').select()

    let emailData = []

    if (data) {
        data.map((value)=>{
            emailData+=`
            <tr>
            <td>${value.id}</td>
            <td>${value.name}</td>
            <td>${value.email}</td>
            <td>${value.subject}</td>
            <td>${value.message}</td>
            <td>${value.created_at}</td>
            </tr>
            `;
        })
        console.log(emailData)
        document.getElementById("table_body").innerHTML=emailData
    }

}


window.onload = fetchData;