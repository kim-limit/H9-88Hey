package com.softeer.data.repository

import com.softeer.data.datasource.SelectOptionDataSource
import com.softeer.data.model.TrimSelectOptionDto
import kotlinx.coroutines.flow.Flow

interface SelectOptionRepository {
    fun getCarCode(): Flow<String>

    fun getSelectOptions(carCode: String): Flow<List<TrimSelectOptionDto>>

    fun getNPerformances(carCode: String): Flow<List<TrimSelectOptionDto>>
}

class SelectOptionRepositoryImpl(
    val selectOptionRemoteDataSource: SelectOptionDataSource
) : SelectOptionRepository {
    override fun getCarCode(): Flow<String> =
        selectOptionRemoteDataSource.getCarCode()

    override fun getSelectOptions(carCode: String): Flow<List<TrimSelectOptionDto>> =
        selectOptionRemoteDataSource.getSelectOptions(carCode)

    override fun getNPerformances(carCode: String): Flow<List<TrimSelectOptionDto>> =
        selectOptionRemoteDataSource.getNPerformances(carCode)
}