

}
export const GetActivity = async(req, res) => {
    try {
        const activity = await Activity.findAll({
            attributes:['idAct','name','date','createdAt', 'updatedAt']
        });
        res.json(activity);
    } catch (error) {
        console.log(error);
    }
}