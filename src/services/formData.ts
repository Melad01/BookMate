const formData = (data: any) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (key === "Categories") {
      data[key].forEach((category, index) => {
        formData.append(
          `Categories[${index}][CategoryID]`,
          category.CategoryID.toString()
        );
        formData.append(
          `Categories[${index}][CategoryName]`,
          category.CategoryName
        );
      });
    } else if (data[key] instanceof File) {
      formData.append(key, data[key], data[key].name);
    } else {
      formData.append(key, data[key]);
    }
  });

  // Debugging: Log formData entries
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  return formData;
};

export default formData;
