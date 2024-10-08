import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

// Create category controller
export const createCategoryController = async (req, res) => {
    try {
    console.log("Request Body:", req.body); // Debugging line
      const  {name}  = req.body;
      
      if (!name) {
        return res.status(401).send({ message: "Name is required" });
      }
      
      const existingCategory = await categoryModel.findOne({ name });
      if (existingCategory) {
        return res.status(200).send({
          success: false,
          message: "Category Already Exisits",
        });
      }
      const category = await new categoryModel({
        name,
        slug: slugify(name),
      }).save();
      res.status(201).send({
        success: true,
        message: "new category created",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error, // Fixed typo here
        message: "Error in Category",
    });
    }
  };
// Update category controller
export const UpdateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        if (!category) {
            return res.status(404).send({
                success: false,
                message: 'Category not found'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'Category updated successfully',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating category"
        });
    }
};

export const CategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        return res.status(200).send({
            success: true,
            message: 'Categories fetched successfully',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while fetching categories"
        });
    }
};

// Single category controller
export const SingleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        if (!category) {
            return res.status(404).send({
                success: false,
                message: 'Single Category not found'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'Single Category fetched successfully',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while fetching single category"
        });
    }
};

// Delete category controller
export const DeleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: 'Category deleted successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while deleting category"
        });
    }
};



// import categoryModel from "../models/categoryModel.js";
// import slugify from "slugify";
// export const createCategoryController = async (req, res) => {
//   try {
//     const { name } = req.body;
//     if (!name) {
//       return res.status(401).send({ message: "Name is required" });
//     }
//     const existingCategory = await categoryModel.findOne({ name });
//     if (existingCategory) {
//       return res.status(200).send({
//         success: false,
//         message: "Category Already Exisits",
//       });
//     }
//     const category = await new categoryModel({
//       name,
//       slug: slugify(name),
//     }).save();
//     res.status(201).send({
//       success: true,
//       message: "new category created",
//       category,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       errro,
//       message: "Errro in Category",
//     });
//   }
// };

// //update category
// export const UpdateCategoryController = async (req, res) => {
//   try {
//     const { name } = req.body;
//     const { id } = req.params;
//     const category = await categoryModel.findByIdAndUpdate(
//       id,
//       { name, slug: slugify(name) },
//       { new: true }
//     );
//     res.status(200).send({
//       success: true,
//       messsage: "Category Updated Successfully",
//       category,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error while updating category",
//     });
//   }
// };

// // get all cat
// export const categoryControlller = async (req, res) => {
//   try {
//     const category = await categoryModel.find({});
//     res.status(200).send({
//       success: true,
//       message: "All Categories List",
//       category,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error while getting all categories",
//     });
//   }
// };

// // single category
// export const singleCategoryController = async (req, res) => {
//   try {
//     const category = await categoryModel.findOne({ slug: req.params.slug });
//     res.status(200).send({
//       success: true,
//       message: "Get SIngle Category SUccessfully",
//       category,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error While getting Single Category",
//     });
//   }
// };

// //delete category
// export const deleteCategoryCOntroller = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await categoryModel.findByIdAndDelete(id);
//     res.status(200).send({
//       success: true,
//       message: "Categry Deleted Successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "error while deleting category",
//       error,
//     });
//   }
// };