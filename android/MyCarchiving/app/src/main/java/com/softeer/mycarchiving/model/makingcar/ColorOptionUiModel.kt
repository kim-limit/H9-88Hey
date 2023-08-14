package com.softeer.mycarchiving.model.makingcar

import com.softeer.data.CarColorType

data class ColorOptionUiModel(
    val category: CarColorType,
    val optionName: String,
    val imageUrl: String,
    val price: Int,
    val matchingColors: List<Int>,
    val tags: List<String>,
)