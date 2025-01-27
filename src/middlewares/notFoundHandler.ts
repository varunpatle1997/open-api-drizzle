
const notFound = (c) => {
    return c.json({
        message: `not found - ${c.req.path}`,
    }, 422)
}

export default notFound;