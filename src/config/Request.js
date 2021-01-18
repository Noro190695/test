export const url = 'http://ocfm.000webhostapp.com/server.php';

export async function get() {
    const  response = await fetch(url);

    return await response.json()

}
export async function post(data) {

    const  response = await fetch(url,{
        method: 'POST',
        body: data
    });
    if (response.ok){
        return await response.json()
    }else{
        throw response
    }
}
